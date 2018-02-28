
function onChange(target) {
  target.prototype.onChange = function (e, flag) {
     this.setState({
       [flag]: e.target.value,
     })
  };
}

export { onChange };
