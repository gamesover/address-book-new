class AddressBook < ApplicationRecord
  require 'csv'

  include ActiveModel::Validations

  validates :name, presence: true
  validates :email, presence: true, uniqueness: true, email: true

  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-]+(\.[a-z\d\-]+)*\.[a-z]+\z/i

  # errors and unsolved_conflicts will fail the write to db
  def self.read_csv(file, correction)
    errors = []
    conflicts = []
    unsolved_conflicts = []
    email_records = {}
    created_num = 0
    updated_num = 0

    unless CsvValidation.validate(file)
      errors.push('This is not a valid csv file')
      return [errors, conflicts, created_num, updated_num]
    end

    AddressBook.transaction do
      CSV.parse(file.read).each.with_index(1) do |line, line_number|
        # check head
        if line_number == 1
          header_errors = validate_header(line)
          errors += header_errors if header_errors.present?
          next
        end

        next if line.blank? # blank line is allowed except the first line(head)

        line_errors = check_csv_line(line, line_number)
        errors += line_errors if line_errors.present?

        if line_errors.blank?
          email = line[0].strip
          name = line[1].strip

          # duplicated emails exist in file, need to be fixed for sure
          if email_records.key?(email)
            email_records[email].push(line_number)
            next
          else
            email_records[email] = [line_number]
          end

          # to here, no known error exist, consider to write to db, except conflicting with db record
          existing_record = AddressBook.find_by(email: email)

          if errors.blank? && existing_record && !existing_record.name.casecmp(name.downcase).zero?
            conflict = {email: line[0], old_name: existing_record.name, new_name: name}
            # all conflicts records in case of need to return to user
            conflicts.push(conflict)

            # only unsolved ones will break writing to db
            if correction.key?(email)
              if correction[email] == 'new'
                existing_record.update!(name: name)
                updated_num += 1
              end
            else
              unsolved_conflicts.push(email)
            end
          end
        end

        # all clear will write to db
        if existing_record.blank? && errors.blank? && unsolved_conflicts.blank?
          AddressBook.create!(email: email, name: name)
          created_num += 1
        end
      end

      # scan duplicated emails in file
      email_records.each do |email, lines|
        if lines.length > 1
          errors.push("Duplicated email: #{email} found at lines #{lines}")
        end
      end

      # any issue will rollback db and clear created and updated num
      if errors.present? || unsolved_conflicts.present?
        created_num = 0
        updated_num = 0
        raise ActiveRecord::Rollback
      end
    end

    conflicts = [] if unsolved_conflicts.blank?

    [errors, conflicts, created_num, updated_num]
  end

  def self.check_csv_line(line, line_number)
    line_errors = []

    if line.size != 2
      line_errors += ["invalid line #{line_number}, must be 2 columns, email and name"]
      return line_errors
    end

    unless validate_email(line[0].strip)
      line_errors += ["invalid email at line #{line_number} found"]
    end

    unless line[1].strip.present?
      line_errors += ["invalid name at line #{line_number} found"]
    end

    line_errors
  end

  private_class_method

  def self.validate_email(email)
    email =~ VALID_EMAIL_REGEX
  end

  def self.validate_header(header_line)
    if header_line && header_line.length == 2 && header_line[0].strip.casecmp('email').zero? &&
        header_line[1].strip.casecmp('name').zero?
      []
    else
      ['CSV header is not right, only \'email,name\' allowed']
    end
  end
end
