import React from "react";
import { Button } from "../Button";
import { render, cleanup } from "react-native-testing-library";

afterEach(cleanup);

describe("<Button />", () => {
  it("should match snapshot", () => {
    const rendered = render(
      <Button title={"teste"} variant={"PRIMARY"} width={"50%"} />
    ).toJSON();

    expect(rendered).toMatchSnapshot();
  });

  it("should render a button component with the title provided by props", () => {
    const buttonTitle = "titulo";
    const rendered = render(
      <Button title={buttonTitle} variant={"PRIMARY"} width={"50%"} />
    );

    const renderedButtonText = rendered.getByTestId("button-text");
    expect(renderedButtonText.props.children).toEqual(buttonTitle);
  });
});
