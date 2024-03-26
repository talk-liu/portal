
#! /bin/bash
git checkout --orphan latest_branch
git add -A
git commit -am 'commit message'
git branch -D master
git branch -m master
git remote add origin7 ssh://git@gitlab.riostox.com:2222/core-team/portal.git
git push -f origin7 master
