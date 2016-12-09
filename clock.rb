require 'yaml'
require 'bundler'
Bundler.require

p File.expand_path($PROGRAM_NAME)

list = YAML.load_file('time.yml')

everyday = list['every']

everyday.each do |time|
  f_time = time.clone.insert(2, ':')
  Clockwork::every(1.days, "#{time}.every", at: f_time) do
    file = Dir.glob(File.expand_path("wav/#{time}")+"/*.wav").sample
    `/usr/bin/aplay -q #{file}`
  end
end
