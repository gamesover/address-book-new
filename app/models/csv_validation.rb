class CsvValidation
  VALID_FILE_TYPES = %w(application/vnd.ms-excel text/csv).freeze
  VALID_EXTENSION = '.csv'.freeze

  def self.validate(file)
    file && VALID_FILE_TYPES.include?(file.content_type) && File.extname(file.original_filename) == VALID_EXTENSION
  end
end
