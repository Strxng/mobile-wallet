import React from "react";
import { CreditValue } from "../CreditValue";
import { render, cleanup } from "react-native-testing-library";

afterEach(cleanup);

describe("<CreditValue />", () => {
  it("should match snapshot", () => {
    const rendered = render(<CreditValue value={0} />).toJSON();
    expect(rendered).toMatchSnapshot();
  });

  it("should render a label with one icon and one text", () => {
    const rendered = render(<CreditValue value={0} />);
    const creditValueRendered = rendered.getByTestId("credit-value");

    expect(creditValueRendered.props.children.length).toBe(2);
  });

  it("should render a text with the same value provided", () => {
    const value = 0;

    const rendered = render(<CreditValue value={value} />);
    const textRendered = rendered.getByTestId("credit-value-text");

    expect(textRendered.children).toEqual([
      `R$${value.toFixed(2).toString().replace(".", ",")}`,
    ]);
  });

  it("should render a creaditValue label with the correct color when value is positive", () => {
    const value = 1;

    const rendered = render(<CreditValue value={value} />);
    const textRendered = rendered.getByTestId("credit-value-text");
    const iconContainerRendered = rendered.getByTestId(
      "credit-value-icon-container"
    );

    let textColor = "";
    let iconColor = "";

    textRendered.props.style.forEach((styleObj: any) => {
      Object.keys(styleObj).forEach((prop) => {
        if (prop === "color") {
          iconColor = styleObj[prop];
        }
      });
    });

    iconContainerRendered.props.style.forEach((styleObj: any) => {
      Object.keys(styleObj).forEach((prop) => {
        if (prop === "backgroundColor") {
          console.log("achou", styleObj[prop]);
          textColor = styleObj[prop];
        }
      });
    });

    expect(iconColor).toBe("#079669");
    expect(textColor).toBe("#079669");
  });

  it("should render a creaditValue label with the correct color when value is negative", () => {
    const value = -1;

    const rendered = render(<CreditValue value={value} />);
    const textRendered = rendered.getByTestId("credit-value-text");
    const iconContainerRendered = rendered.getByTestId(
      "credit-value-icon-container"
    );

    let textColor = "";
    let iconColor = "";

    textRendered.props.style.forEach((styleObj: any) => {
      Object.keys(styleObj).forEach((prop) => {
        if (prop === "color") {
          iconColor = styleObj[prop];
        }
      });
    });

    iconContainerRendered.props.style.forEach((styleObj: any) => {
      Object.keys(styleObj).forEach((prop) => {
        if (prop === "backgroundColor") {
          console.log("achou", styleObj[prop]);
          textColor = styleObj[prop];
        }
      });
    });

    expect(iconColor).toBe("#9f1339");
    expect(textColor).toBe("#9f1339");
  });

  it("should render a creaditValue label with the correct color when value is neutral", () => {
    const value = 0;

    const rendered = render(<CreditValue value={value} />);
    const textRendered = rendered.getByTestId("credit-value-text");
    const iconContainerRendered = rendered.getByTestId(
      "credit-value-icon-container"
    );

    let textColor = "";
    let iconColor = "";

    textRendered.props.style.forEach((styleObj: any) => {
      Object.keys(styleObj).forEach((prop) => {
        if (prop === "color") {
          iconColor = styleObj[prop];
        }
      });
    });

    iconContainerRendered.props.style.forEach((styleObj: any) => {
      Object.keys(styleObj).forEach((prop) => {
        if (prop === "backgroundColor") {
          console.log("achou", styleObj[prop]);
          textColor = styleObj[prop];
        }
      });
    });

    expect(iconColor).toBe("#52525b");
    expect(textColor).toBe("#52525b");
  });
});
