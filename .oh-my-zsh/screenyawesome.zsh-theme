build_psr_prefix(){
  echo "%{$fg[green]%}%{$bg[black]%}${1}%{$fg[cyan]%}%{$fg[black]%}%{$bg[cyan]%}"
}
build_svn(){
  local revision="$(svn_current_revision)"
  local build_svn_status="$(build_psr_prefix 'svn')"
  if [ ! -z "$revision" ]; then
    local status_mod="$(svn_status_info)"
    if [ "${#${status_mod}}" -gt 1 ]; then status_mod="${status_mod:1}"; fi
    build_svn_status="${build_svn_status}${revision}${status_mod}"
    echo "$build_svn_status %{$reset_color%}"
  fi
}

local return_code="%(?..%{$fg[red]%}%? %{$reset_color%})"

ZSH_THEME_GIT_PROMPT_PREFIX="$(build_psr_prefix 'git')"
ZSH_THEME_GIT_PROMPT_SUFFIX=" %{$reset_color%}"
ZSH_THEME_GIT_PROMPT_DIRTY="%{$fg[red]%}%{$fg[green]%}"
ZSH_THEME_GIT_PROMPT_CLEAN=""

ZSH_THEME_SVN_PROMPT_CLEAN=""
ZSH_THEME_SVN_PROMPT_ADDITIONS="%{$fg[red]%}%{$fg[green]%}"
ZSH_THEME_SVN_PROMPT_DELETIONS="%{$fg[red]%}%{$fg[green]%}"
ZSH_THEME_SVN_PROMPT_MODIFICATIONS="%{$fg[red]%}%{$fg[green]%}"
ZSH_THEME_SVN_PROMPT_REPLACEMENTS="%{$fg[red]%}%{$fg[green]%}"
ZSH_THEME_SVN_PROMPT_UNTRACKED="%{$fg[red]%}%{$fg[green]%}"
ZSH_THEME_SVN_PROMPT_DIRTY="%{$fg[red]%}%{$fg[green]%}"


PROMPT='%{$bg[black]%}%{$fg[cyan]%}%~% %{$fg[black]%}%{$bg[white]%}%{$fg[red]%}%(!.♯.»)%{$reset_color%}%{$fg[white]%}%{$reset_color%}'
RPS1='${return_code} $(git_prompt_info)$(build_svn)'
