import { override } from '@microsoft/decorators';
import { Log } from '@microsoft/sp-core-library';
import {
  BaseApplicationCustomizer,
  PlaceholderContent,
  PlaceholderName
} from '@microsoft/sp-application-base';
import { Dialog } from '@microsoft/sp-dialog';
import styles from './AppCustomizer.module.scss';
import { escape } from '@microsoft/sp-lodash-subset';
import * as ReactDom from "react-dom";
import * as React from "react";

import { INavigationBarProps } from "./components/INavigationBarProps";
import { INavigationBarState } from "./components/INavigationBarState";
import * as strings from 'KgNavbarApplicationCustomizerStrings';

import  NavigationBar  from "./components/NavigationBar";

const LOG_SOURCE: string = 'KgNavbarApplicationCustomizer';

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface IKgNavbarApplicationCustomizerProperties {
  // This is an example; replace with your own property
  testMessage: string;
  Top: string;
  Bottom: string;
}

/** A Custom Action which can be run during execution of a Client Side Application */
export default class KgNavbarApplicationCustomizer
  extends BaseApplicationCustomizer<IKgNavbarApplicationCustomizerProperties> {

  private _topPlaceholder: PlaceholderContent | undefined;
  private _bottomPlaceholder: PlaceholderContent | undefined;


  @override
  public onInit(): Promise<void> {
    Log.info(LOG_SOURCE, `Initialized ${strings.Title}`);

    let message: string = this.properties.testMessage;
    if (!message) {
      message = '(No properties were provided.)';
    }

    this.context.placeholderProvider.changedEvent.add(this, this._renderPlaceHolders);


    // Dialog.alert(`Hello from ${strings.Title}:\n\n${message}`);

    return Promise.resolve();
  }

  private _renderPlaceHolders(): void {
    console.log("HelloWorldApplicationCustomizer._renderPlaceHolders()");
    console.log(
      "Available placeholders: ",
      this.context.placeholderProvider.placeholderNames
        .map(name => PlaceholderName[name])
        .join(", ")
    );

    // Handling the top placeholder
    if (!this._topPlaceholder) {
      this._topPlaceholder = this.context.placeholderProvider.tryCreateContent(
        PlaceholderName.Top,
        { onDispose: this._onDispose }
      );

      // The extension should not assume that the expected placeholder is available.
      if (!this._topPlaceholder) {
        console.error("The expected placeholder (Top) was not found.");
        return;
      }

      if (this.properties) {
        let topString: string = this.properties.Top;
        if (!topString) {
          topString = "(Top property was not defined.)";
        }

        // if (this._topPlaceholder.domElement) {
        //   this._topPlaceholder.domElement.innerHTML = `
        //   <div class="${styles.app}">
        //     <div class="${styles.top}">
        //       <i class="ms-Icon ms-Icon--Info" aria-hidden="true"></i> ${escape(
        //         topString
        //       )}
        //     </div>
        //   </div>`;
        // }

          // init the react mega menu component.
    const element: React.ReactElement<INavigationBarProps> = React.createElement(
      NavigationBar,
      {
        serviceScope: this.context.serviceScope,
        context: this.context,
      }
    );


    // render the react element in the top placeholder.
    ReactDom.render(element, this._topPlaceholder.domElement);


      }
    // const element: React.ReactElement<INavigationBarProps> = React.createElement(
    //   NavigationBar,
    //   {
    //    serviceScope: this.context.serviceScope,
    //    context: this.context,
    //   }
    // );

    // ReactDom.render(element, this.domElement);

    }

    // Handling the bottom placeholder
    if (!this._bottomPlaceholder) {
      this._bottomPlaceholder = this.context.placeholderProvider.tryCreateContent(
        PlaceholderName.Bottom,
        { onDispose: this._onDispose }
      );

      // The extension should not assume that the expected placeholder is available.
      if (!this._bottomPlaceholder) {
        console.error("The expected placeholder (Bottom) was not found.");
        return;
      }

      if (this.properties) {
        let bottomString: string = this.properties.Bottom;
        if (!bottomString) {
          bottomString = "(Bottom property was not defined.)";
        }

        if (this._bottomPlaceholder.domElement) {
          this._bottomPlaceholder.domElement.innerHTML = `
          <div class="${styles.navlinksContainer}">
            <div class="${styles.navigationBar}">
              <i class="ms-Icon ms-Icon--Info" aria-hidden="true"></i> ${escape(
            bottomString
          )}
            </div>
          </div>`;
        }
      }
    }
  }

  private _onDispose(): void {
    console.log('[HelloWorldApplicationCustomizer._onDispose] Disposed custom top and bottom placeholders.');
  }
}
