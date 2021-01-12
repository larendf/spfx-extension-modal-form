import * as React from "react";
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

export const NavigationBar = (
  props: INavigationBarProps,
  state: INavigationBarState
) => {
  const cancelIcon: IIconProps = { iconName: "Cancel" };
  const [isModalOpen, { setTrue: showModal, setFalse: hideModal }] = useBoolean(
    false
  );
  const dialogContent = {
    type: DialogType.normal,
    Title: "Message",
    subText: "Your request have been submitted successfully",
    closeButtonAriaLabel: "Close",
  };

  return (
    <div className={"ms-Grid " + styles.navigationStyles}>
      <div className={"ms-Grid-row " + styles.navigationBar}>
        <div className={"ms-Grid-col ms-sm5 " + styles.navMenu}>
          <div className={styles.navIconsContainer}>
            <div className={styles.navIconsDiv}>
              <Suspense fallback={<React.Fragment></React.Fragment>}>
                {/* <Pivot
                  aria-label="Links of Large Tabs Pivot Example"
                  linkFormat={PivotLinkFormat.tabs}
                  linkSize={PivotLinkSize.large}
                >
                  <PivotItem headerText="Foo">
                    <Label>Pivot #1</Label>
                  </PivotItem>
                  <PivotItem headerText="Bar">
                    <Label>Pivot #2</Label>
                  </PivotItem>
                  <PivotItem headerText="Bas">
                    <Label>Pivot #3</Label>
                  </PivotItem>
                  <PivotItem headerText="Biz">
                    <Label>Pivot #4</Label>
                  </PivotItem>
                </Pivot> */}
                {/* <DefaultButton title="Home" text="Home" className={styles.buttonNoBorder} ></DefaultButton>
                <DefaultButton title="Your Feed" text="Your Feed" className={styles.buttonNoBorder}></DefaultButton>
                <DefaultButton title="People Directory" text="People Directory"  className={styles.buttonNoBorder} ></DefaultButton>
                <DefaultButton title="Send Feedback" text="Send Feedback" className={styles.buttonPrimaryTextColor} ></DefaultButton>&nbsp;&nbsp; */}
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
                    <p>
                      We are always looking for knowledge from the experiences
                      and hard work of our people at Lendlease. The knowledge
                      you contribute will be reviewed by the Practices Team and
                      codified to make it easy for people to find. If you have
                      something you think might be suitable, we'd love to hear
                      from you!
                    </p>
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

                    <DefaultButton text="Cancel" />
                    <DefaultButton
                      text="Submit"
                      //onClick={this.SubmitData}
                    />
                  </div>
                </Modal>
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

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
