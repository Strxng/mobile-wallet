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

  it("should render a button with the background color correctly when the variant is primary", () => {
    const variant = "PRIMARY";

    const rendered = render(
      <Button title={"teste"} variant={variant} width={"50%"} />
    );

    const buttonRendered = rendered.getByTestId("button");
    expect(buttonRendered.props.style.backgroundColor).toBe("#1c4ed8");
  });

  it("should render a button with the background color correctly when the variant is secondary", () => {
    const variant = "SECONDARY";

    const rendered = render(
      <Button title={"teste"} variant={variant} width={"50%"} />
    );

    const buttonRendered = rendered.getByTestId("button");
    expect(buttonRendered.props.style.backgroundColor).toBe("#27272a");
  });

  it("should render a button with an icon when iconName is provided", () => {
    const rendered = render(
      <Button
        title={"teste"}
        variant={"PRIMARY"}
        width={"50%"}
        iconName="money"
      />
    );

    const buttonRendered = rendered.getByTestId("button");
    expect(buttonRendered.props.children.length).toBe(2);
    // validei se renderizou 2 componentes filhos pq não funcionou pegar o icone pelo testID
  });
});
