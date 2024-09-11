import React from "react";
import { render, act } from "@testing-library/react";
import UseIntersection from "../../../../../modules/MyAccount/components/OrderDocumentList/UseIntersection";

beforeEach(() => {
  class IntersectionObserverMock {
    observe() {}
    unobserve() {}
    disconnect() {}
    callback(entries) {
      this.instance.callback(entries);
    }
  }

  global.IntersectionObserver = jest.fn((callback, options) => {
    const instance = new IntersectionObserverMock();
    instance.instance = instance;
    instance.callback = callback;
    instance.options = options;
    global.IntersectionObserver.mock.instances.push(instance);
    return instance;
  });

  global.IntersectionObserver.mock.instances = [];
});

afterEach(() => {
  global.IntersectionObserver = undefined;
});

describe("IntersectionFound", () => {
  test("triggers onVisible action when in the viewport", async () => {
    const onVisibleAction = jest.fn();

    render(
      <UseIntersection onVisible={onVisibleAction}>
        {(isVisible) => <div>Content</div>}
      </UseIntersection>
    );

    await act(async () => {
      global.IntersectionObserver.mock.instances[1].callback([
        { isIntersecting: true },
      ]);
    });

    await new Promise((resolve) => setTimeout(resolve, 0));
  });

  test("triggers when in the viewport without onVisible action", async () => {
    render(
      <UseIntersection>{(isVisible) => <div>Content</div>}</UseIntersection>
    );

    await act(async () => {
      global.IntersectionObserver.mock.instances[1].callback([
        { isIntersecting: true },
      ]);
    });

    await new Promise((resolve) => setTimeout(resolve, 0));
  });

  test("triggers outViewport action when out of the viewport", async () => {
    const outViewportAction = jest.fn();

    render(
      <UseIntersection outViewportAction={outViewportAction}>
        {(isVisible) => <div>Content</div>}
      </UseIntersection>
    );

    await act(async () => {
      global.IntersectionObserver.mock.instances[1].callback([
        { isIntersecting: false },
      ]);
    });
    await new Promise((resolve) => setTimeout(resolve, 0));
  });
});
