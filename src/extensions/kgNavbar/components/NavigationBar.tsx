import * as React from "react";
import * as ReactDOM from "react-dom";
import { Suspense } from "react";
import { INavigationBarProps } from "./INavigationBarProps";
import { INavigationBarState } from "./INavigationBarState";
import { ServiceScope } from "@microsoft/sp-core-library";
import { ApplicationCustomizerContext } from "@microsoft/sp-application-base";
import { useId, useBoolean } from "@uifabric/react-hooks";

import styles from "./NavigationBar.module.scss";

import {
  PrimaryButton,
  DefaultButton,
  Pivot,
  PivotItem,
  PivotLinkFormat,
  PivotLinkSize,
  getTheme,
  mergeStyleSets,
  FontWeights,
  ContextualMenu,
  Modal,
  IconButton,
  IIconProps,
  Dialog,
  DialogFooter,
  DialogType,
} from "office-ui-fabric-react";
import { Label } from "office-ui-fabric-react/lib/Label";
import { TextField } from "office-ui-fabric-react/lib/TextField";
import { sp } from "@pnp/sp/presets/all";

const theme = getTheme();
const contentStyles = mergeStyleSets({
  container: {
    display: "flex",
    flexFlow: "column nowrap",
    alignItems: "stretch",
    maxWidth: "960px",
  },
  header: [
    // eslint-disable-next-line deprecation/deprecation
    theme.fonts.xLargePlus,
    {
      flex: "1 1 auto",
      color: theme.palette.neutralPrimary,
      display: "flex",
      alignItems: "center",
      fontWeight: FontWeights.semibold,
      padding: "12px 12px 14px 24px",
    },
  ],
  body: {
    flex: "4 4 auto",
    padding: "0 24px 24px 24px",
    overflowY: "hidden",
    selectors: {
      p: { margin: "14px 0" },
      "p:first-child": { marginTop: 0 },
      "p:last-child": { marginBottom: 0 },
    },
  },
  textContent: {
    width: "100%",
    height: "200px",
  },
});
const iconButtonStyles = {
  root: {
    color: theme.palette.neutralPrimary,
    marginLeft: "auto",
    marginTop: "4px",
    marginRight: "2px",
  },
  rootHovered: {
    color: theme.palette.neutralDark,
  },
};

// export const NavigationBar = (
//   props: INavigationBarProps,
//   state: INavigationBarState
// ) => {
    const cancelIcon: IIconProps = { iconName: "Cancel" };
    const [
      isModalOpen,
      { setTrue: showModal, setFalse: hideModal },
    ] = useBoolean(false);
    const dialogContent = {
      type: DialogType.normal,
      Title: "Message",
      subText: "Your request have been submitted successfully",
      closeButtonAriaLabel: "Close",
    };


export default class NavigationBar extends React.Component<
  INavigationBarProps,
  INavigationBarState
> {
  constructor(props: INavigationBarProps) {
    super(props);
   // this.state = {};
  }

  // public componentDidMount(): void {
  //   // get the mega menu items and update the component state.
  // }

 public render(): JSX.Element {
    return (
      <div className={"ms-Grid " + styles.navigationStyles}>
        <div className={"ms-Grid-row " + styles.navigationBar}>
          <div className={"ms-Grid-col ms-sm5 " + styles.navMenu}>
            <div className={styles.navIconsContainer}>
              <div className={styles.navIconsDiv}>
            
                  <PrimaryButton
                    title="Contribute Knowledge"
                    text="Contribute Knowledge"
                    onClick={showModal}
                    className={"mainButton"}
                  ></PrimaryButton>
                  <Modal
                    titleAriaId="Contribute Knowledge"
                    isOpen={isModalOpen}
                    onDismiss={hideModal}
                    isBlocking={false}
                    containerClassName={contentStyles.container}
                  >
                    <div className={contentStyles.header}>
                      <span>
                        Contribute knowledge to the Practices Knowledge Gateway
                      </span>
                      <IconButton
                        styles={iconButtonStyles}
                        iconProps={cancelIcon}
                        ariaLabel="Close popup modal"
                        onClick={hideModal}
                      />
                    </div>
                    <div className={contentStyles.body}>
                      <p>dsds</p>
                      <p>Your region</p>
                      <p>
                        Please provide a brief overview of the knowledge you are
                        contributing
                      </p>

                      <TextField
                        //value={this.state.brief}
                        label="Standard"
                        multiline
                        rows={3}
                        className={contentStyles.textContent}
                      />

                      <DefaultButton text="Cancel" onClick={hideModal} />
                      <DefaultButton
                        text="Submit"
                        //onClick={this.SubmitData}
                      />
                    </div>
                  </Modal>
              
              </div>
            </div>
          </div>
        </div>
      </div>
    );
   }
}

// ReactDOM.render(NavigationBar, this.domElement)
