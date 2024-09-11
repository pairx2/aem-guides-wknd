const actions = {
  submit: ({target}) => {
    if(target){
      const form = target.closest('form');
      if(form){
        form.dispatchEvent(new Event('submit'));
      }
    }
  },
};

export default actions;
