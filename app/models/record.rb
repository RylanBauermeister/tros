class Record < ApplicationRecord

  def self.topTen
    self.all.size >= 10 ? self.all[-10..-1] : self.all
  end

end
