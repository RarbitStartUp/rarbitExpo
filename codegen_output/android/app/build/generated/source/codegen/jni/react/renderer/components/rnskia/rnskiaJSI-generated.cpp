/**
 * This code was generated by [react-native-codegen](https://www.npmjs.com/package/react-native-codegen).
 *
 * Do not edit this file as changes may cause incorrect behavior and will be lost
 * once the code is regenerated.
 *
 * @generated by codegen project: GenerateModuleCpp.js
 */

#include "rnskiaJSI.h"

namespace facebook::react {

static jsi::Value __hostFunction_NativeSkiaModuleCxxSpecJSI_install(jsi::Runtime &rt, TurboModule &turboModule, const jsi::Value* args, size_t count) {
  return static_cast<NativeSkiaModuleCxxSpecJSI *>(&turboModule)->install(
    rt
  );
}

NativeSkiaModuleCxxSpecJSI::NativeSkiaModuleCxxSpecJSI(std::shared_ptr<CallInvoker> jsInvoker)
  : TurboModule("RNSkiaModule", jsInvoker) {
  methodMap_["install"] = MethodMetadata {0, __hostFunction_NativeSkiaModuleCxxSpecJSI_install};
}


} // namespace facebook::react
