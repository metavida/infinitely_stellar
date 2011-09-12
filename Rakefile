require 'rake'

PROJECT_ROOT = File.expand_path(File.dirname(__FILE__))

PLATFORMS = {
  :chrome => {
    :dist_dir => File.join(PROJECT_ROOT, 'dist/chrome'),
    :files => {
      'chrome/manifest.json'    => '/',
      ['infinitely_stellar.js', 'chrome/init.after.js'] \
                                => 'infinitely_stellar.js',
      'infinitely_stellar.css'  => '/',
      'chrome/zepto.min.js'     => '/',
      'images/icon-16.png'      => '/',
      'images/icon-48.png'      => '/',
      'images/icon-128.png'     => '/',
    }
  },
  :greasemonkey => {
    :dist_dir => File.join(PROJECT_ROOT, 'dist/greasemonkey'),
    :files => {
      ['greasemonkey/init.before.js', 'infinitely_stellar.js', 'greasemonkey/init.after.js'] \
        => 'infinitely_stellar.user.js',
    }
  },
  :firefox => {
    :dist_dir => File.join(PROJECT_ROOT, 'dist/firefox'),
    :files => {
      'infinitely_stellar.js'   => '/',
      'infinitely_stellar.css'  => '/',
    }
  }
}

task :default => [:clean, :combine]

desc "Clean the distribution directories."
task :clean do
  PLATFORMS.each do |name, platform|
    rm_rf platform[:dist_dir]
    mkdir platform[:dist_dir]
  end
end

desc "Combine the required files to create versions for distribution."
task :combine do
  PLATFORMS.each do |name, platform|
    platform[:files].each do |src, dst|
      src = Array(src)
      src = src.map { |s| File.join(PROJECT_ROOT, s) }
      dst = File.join(platform[:dist_dir], dst)
      
      case src.size
      when 1
        src = src.shift
        if File.directory?(dst)
          cp src, File.join(dst, File.basename(src))
        else
          cp src, dst
        end
      else
        cp src.shift, dst
        
        src.each do |s|
          File.open(dst, 'a') do |file|
            file << File.open(s).read
          end
        end
      end
    end
  end
end
