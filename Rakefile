sass_dir = "site/assets/_sass"
css_dir = "site/assets/styles"

desc "jekyll and Sass task"
task :default do
  puts 'Let\'s go!'
  jekyllPid = Process.spawn("jekyll serve --watch")
  sassPid = Process.spawn("sass --watch #{sass_dir}/app.scss:#{css_dir}/app.css")

  trap("INT") {
    [jekyllPid, sassPid].each { |pid| Process.kill(9, pid) rescue Errno::ESRCH }
    exit 0
  }

  [jekyllPid, sassPid].each { |pid| Process.wait(pid) }
end
