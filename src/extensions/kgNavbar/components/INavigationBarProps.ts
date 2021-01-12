import { ServiceScope } from "@microsoft/sp-core-library";
import { ApplicationCustomizerContext } from "@microsoft/sp-application-base";

export interface INavigationBarProps {
  serviceScope: ServiceScope;
  context: ApplicationCustomizerContext;
};
