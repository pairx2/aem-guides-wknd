export default function createConditionalEvent(value, variable) {
  return new CustomEvent('conditional-component-change', {
    detail: {
      value, // The value the event is setting the variable to
      var: variable, // The variable the event is setting
    },
  });
}
