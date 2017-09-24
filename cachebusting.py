from os import listdir, getcwd
from os.path import join, isfile
import shutil

cwd = getcwd()

vendorjs = ''
bundlejs = ''
for f in listdir(join(cwd, 'dist')):
    if isfile(join(cwd, 'dist/' + f)) and 'vendor.bundle' in f and f.endswith('js'):
        vendorjs = f
    elif isfile(join(cwd, 'dist/' + f)) and 'bundle' in f and 'vendor.bundle' not in f and f.endswith('js'):
        bundlejs = f

print(vendorjs)
print(bundlejs)

newindex = open('newindex.html', 'w')

with open(join(cwd, 'templates/index.html')) as oldindex:
    for line in oldindex:
        if 'assets/dist/vendor.bundle' in line:
            newindex.write('<script src="assets/dist/')
            newindex.write(vendorjs)
            newindex.write('"></script>\n')
        elif 'assets/dist/bundle' in line:
            newindex.write('<script src="assets/dist/')
            newindex.write(bundlejs)
            newindex.write('"></script>\n')
        else:
            newindex.write(line)

newindex.close()
shutil.move(join(cwd, 'templates/index.html'), join(cwd, 'templates/index.html.bak'))
shutil.move(join(cwd, 'newindex.html'), join(cwd, 'templates/index.html'))