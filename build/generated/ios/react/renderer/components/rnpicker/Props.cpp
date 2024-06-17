
/**
 * This code was generated by [react-native-codegen](https://www.npmjs.com/package/react-native-codegen).
 *
 * Do not edit this file as changes may cause incorrect behavior and will be lost
 * once the code is regenerated.
 *
 * @generated by codegen project: GeneratePropsCpp.js
 */

#include <react/renderer/components/rnpicker/Props.h>
#include <react/renderer/core/PropsParserContext.h>
#include <react/renderer/core/propsConversions.h>

namespace facebook::react {

RNCAndroidDialogPickerProps::RNCAndroidDialogPickerProps(
    const PropsParserContext &context,
    const RNCAndroidDialogPickerProps &sourceProps,
    const RawProps &rawProps): ViewProps(context, sourceProps, rawProps),

    items(convertRawProp(context, rawProps, "items", sourceProps.items, {})),
    color(convertRawProp(context, rawProps, "color", sourceProps.color, {})),
    prompt(convertRawProp(context, rawProps, "prompt", sourceProps.prompt, {})),
    enabled(convertRawProp(context, rawProps, "enabled", sourceProps.enabled, {false})),
    selected(convertRawProp(context, rawProps, "selected", sourceProps.selected, {0})),
    backgroundColor(convertRawProp(context, rawProps, "backgroundColor", sourceProps.backgroundColor, {0})),
    dropdownIconColor(convertRawProp(context, rawProps, "dropdownIconColor", sourceProps.dropdownIconColor, {0})),
    dropdownIconRippleColor(convertRawProp(context, rawProps, "dropdownIconRippleColor", sourceProps.dropdownIconRippleColor, {0})),
    numberOfLines(convertRawProp(context, rawProps, "numberOfLines", sourceProps.numberOfLines, {0}))
      {}
RNCAndroidDropdownPickerProps::RNCAndroidDropdownPickerProps(
    const PropsParserContext &context,
    const RNCAndroidDropdownPickerProps &sourceProps,
    const RawProps &rawProps): ViewProps(context, sourceProps, rawProps),

    items(convertRawProp(context, rawProps, "items", sourceProps.items, {})),
    color(convertRawProp(context, rawProps, "color", sourceProps.color, {})),
    prompt(convertRawProp(context, rawProps, "prompt", sourceProps.prompt, {})),
    enabled(convertRawProp(context, rawProps, "enabled", sourceProps.enabled, {false})),
    selected(convertRawProp(context, rawProps, "selected", sourceProps.selected, {0})),
    backgroundColor(convertRawProp(context, rawProps, "backgroundColor", sourceProps.backgroundColor, {0})),
    dropdownIconColor(convertRawProp(context, rawProps, "dropdownIconColor", sourceProps.dropdownIconColor, {0})),
    dropdownIconRippleColor(convertRawProp(context, rawProps, "dropdownIconRippleColor", sourceProps.dropdownIconRippleColor, {0})),
    numberOfLines(convertRawProp(context, rawProps, "numberOfLines", sourceProps.numberOfLines, {0}))
      {}
RNCPickerProps::RNCPickerProps(
    const PropsParserContext &context,
    const RNCPickerProps &sourceProps,
    const RawProps &rawProps): ViewProps(context, sourceProps, rawProps),

    items(convertRawProp(context, rawProps, "items", sourceProps.items, {})),
    selectedIndex(convertRawProp(context, rawProps, "selectedIndex", sourceProps.selectedIndex, {0})),
    selectionColor(convertRawProp(context, rawProps, "selectionColor", sourceProps.selectionColor, {})),
    color(convertRawProp(context, rawProps, "color", sourceProps.color, {})),
    textAlign(convertRawProp(context, rawProps, "textAlign", sourceProps.textAlign, {})),
    numberOfLines(convertRawProp(context, rawProps, "numberOfLines", sourceProps.numberOfLines, {0})),
    fontSize(convertRawProp(context, rawProps, "fontSize", sourceProps.fontSize, {0})),
    fontWeight(convertRawProp(context, rawProps, "fontWeight", sourceProps.fontWeight, {})),
    fontStyle(convertRawProp(context, rawProps, "fontStyle", sourceProps.fontStyle, {})),
    fontFamily(convertRawProp(context, rawProps, "fontFamily", sourceProps.fontFamily, {})),
    testID(convertRawProp(context, rawProps, "testID", sourceProps.testID, {})),
    themeVariant(convertRawProp(context, rawProps, "themeVariant", sourceProps.themeVariant, {})),
    fakeProp(convertRawProp(context, rawProps, "fakeProp", sourceProps.fakeProp, {}))
      {}

} // namespace facebook::react
