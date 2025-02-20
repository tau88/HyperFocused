export type ToolIconTemplateProps = {
  /**The title of the app. */
  title: string;
  /**The description of the app. */
  desc: string;
  /**The color of the button icon. It supports colors in hex. */
  color?: string;
  /** You can manipulate the function through callback to retrieve or progress to next part of the data/component */
  onClick?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
  /**Any other props supplied will be provided through other */
  [other: string]: any;
};
