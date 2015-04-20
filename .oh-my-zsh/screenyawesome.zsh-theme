build_svn(){
  local revision="$(svn_current_revision)"
  if [ ! -z "$revision" ]; then
    local status_mod="$(svn_status_info)"
    if [ "${#${status_mod}}" -gt 1 ]; then status_mod="${status_mod:2}"; fi
    local build_svn_status="${revision} ${status_mod}"
    echo "$FG[242]@%{$reset_color%}$build_svn_status"
  fi
}

ZSH_THEME_GIT_PROMPT_PREFIX="$FG[242]@%{$reset_color%}"
ZSH_THEME_GIT_PROMPT_SUFFIX="%{$reset_color%}"
ZSH_THEME_GIT_PROMPT_DIRTY=" %{$fg[red]%}%{$fg[green]%}"
ZSH_THEME_GIT_PROMPT_CLEAN=" "

ZSH_THEME_SVN_PROMPT_CLEAN=""
ZSH_THEME_SVN_PROMPT_ADDITIONS="%{$fg[red]%}⊕%{$reset_color%}"
ZSH_THEME_SVN_PROMPT_DELETIONS="%{$fg[red]%}⊗%{$reset_color%}"
ZSH_THEME_SVN_PROMPT_MODIFICATIONS="%{$fg[red]%}∗%{$reset_color%}"
ZSH_THEME_SVN_PROMPT_REPLACEMENTS="%{$fg[red]%}%{$reset_color%}"
ZSH_THEME_SVN_PROMPT_UNTRACKED="%{$fg[red]%}⚑%{$reset_color%}"
ZSH_THEME_SVN_PROMPT_DIRTY="%{$fg[red]%}%{$reset_color%}"

PROMPT='$FG[242]%3~%{$reset_color%}
%(?.%F{magenta}.%F{red})❯%f '

RPS1='$(git_prompt_info)$(build_svn)'
