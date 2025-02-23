export type ToolIconTemplateProps = {
  /**The title of the app. */
  title: string;
  /**The description of the app. */
  desc: string;
  /** Icon for app */
  Icon: React.ElementType;
  /**Any other props supplied will be provided through other */
  [other: string]: any;
};
