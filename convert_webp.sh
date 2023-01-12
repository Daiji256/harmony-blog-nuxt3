#!/bin/sh
# `imagemagick` is required

images=`find public/images -type f -name \*.jpg -or -name \*.png`
for image in $images
do
  convert $image -resize 640x396^ -quality 75 -define webp:method=6 "${image%.*}.webp"
  convert $image -resize 1200x630^ -gravity center -crop 1200x630+0+0 -quality 75 "${image%.*}-ogp.jpg"
done
