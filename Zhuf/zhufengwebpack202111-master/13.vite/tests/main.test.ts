import { mount } from "@vue/test-utils";
const Message = {
  template: "<div>{{msg}}</div>",
  props: ["msg"],
};
test("测试msg是否能正常显示", () => {
  const wrapper = mount(Message, {
    props: {
      msg: "zhufeng",
    },
  });
  expect(wrapper.text()).toContain("zhufeng");
});
// test expect都是由jest提供的
