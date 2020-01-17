from subprocess import run
from shutil import rmtree
from os.path import join

dist_folder = './dist'

# erase the dist folder for a clean new build
rmtree(dist_folder)

# build for production
run('npm run build', shell=True)

# delete files on neocities
output = run(['neocities', 'list', '/'], capture_output=True).stdout
for line in output.decode("utf-8").split('\n'):
    if line and line != 'index.html': 
        run('neocities delete ' + line, shell=True)

# push current dist to neocities
run('neocities push ' + dist_folder, shell=True)
