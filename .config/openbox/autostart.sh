#!/usr/bin/zsh

# compton for shadows and such
compton -b --config ~/.config/compton.conf &

## Thunar Daemon for auto-mounting
thunar --daemon &

## Here be Wallpapers
sh ~/.fehbg &

## tint2 Panel starter
tint2 &

## Our ALSA-Volumeicon
(sleep 3s && volumeicon) &

## truecrypt-gui
truecrypt /dev/sdb1 /media/winfs &
