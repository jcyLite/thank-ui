import store from '@/store';
export function showNew(alias, show){
    if(!show){
      var show;
      layui.each(store.state.cache.message, function(){
        show = true;
        return false;
      });
    }
    $('#LAY_layimNew'+alias)[show ? 'addClass' : 'removeClass']('layui-show');
};