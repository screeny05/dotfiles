# Push and pop directories on directory stack
alias pu='pushd'
alias po='popd'

# Basic directory operations
alias ...='cd ../..'
alias -- -='cd -'

# Super user
alias _='sudo'
alias please='sudo'

#alias g='grep -in'

# Show history
if [ "$HIST_STAMPS" = "mm/dd/yyyy" ]
then
    alias history='fc -fl 1'
elif [ "$HIST_STAMPS" = "dd.mm.yyyy" ]
then
    alias history='fc -El 1'
elif [ "$HIST_STAMPS" = "yyyy-mm-dd" ]
then
    alias history='fc -il 1'
else
    alias history='fc -l 1'
fi

alias ls='ls --color=auto'
alias grep='grep --color=auto'
alias fgrep='fgrep --color=auto'
alias egrep='egrep --color=auto'

# List direcory contents
alias lsa='ls -lah'
alias l='ls -lah'
alias ll='ls -lh'
alias la='ls -lAh'

alias afind='ack-grep -il'

alias copy='xclip -sel clip'

alias latom='sudo atom /var/www/html'

alias svn.head='svn revert --recursive .'
alias svn.ud-templateck='svn update && rm -r /var/www/html/templates/emotion_casekingde && cp -r trunk/emotion_casekingde /var/www/html/templates'
alias svn.re-templateck='rm -r trunk/emotion_casekingde && cp -r /var/www/html/templates/emotion_casekingde trunk'
alias svn.kompare='svn diff --diff-cmd diff | kompare -o -'
alias svn.kompare-head='svn diff --diff-cmd diff -r HEAD | kompare -o -'

alias git.kompare='git diff | kompare -o -'

alias ssh.devck='ssh -t root@devck.de "cd /var/vhosts/stg-ck-de ; bash"'
alias ssh.ckhe5='ssh -t root@ckhe5.caseking.de "cd /var/www/www.caseking.de/shop/catalog ; bash"'
alias ssh.scncx='ssh -t auth@scn.cx -p 8022 "su root ; bash"'
alias ssh.lclcr='ssh root@localcraft.de'
