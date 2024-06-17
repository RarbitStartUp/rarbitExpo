
/**
 * This code was generated by [react-native-codegen](https://www.npmjs.com/package/react-native-codegen).
 *
 * Do not edit this file as changes may cause incorrect behavior and will be lost
 * once the code is regenerated.
 *
 * @generated by codegen project: GenerateModuleJniH.js
 */

#pragma once

#include <ReactCommon/JavaTurboModule.h>
#include <ReactCommon/TurboModule.h>
#include <jsi/jsi.h>

namespace facebook::react {

/**
 * JNI C++ class for module 'NativeSvgRenderableModule'
 */
class JSI_EXPORT NativeSvgRenderableModuleSpecJSI : public JavaTurboModule {
public:
  NativeSvgRenderableModuleSpecJSI(const JavaTurboModule::InitParams &params);
};

/**
 * JNI C++ class for module 'NativeSvgViewModule'
 */
class JSI_EXPORT NativeSvgViewModuleSpecJSI : public JavaTurboModule {
public:
  NativeSvgViewModuleSpecJSI(const JavaTurboModule::InitParams &params);
};


JSI_EXPORT
std::shared_ptr<TurboModule> rnsvg_ModuleProvider(const std::string &moduleName, const JavaTurboModule::InitParams &params);

} // namespace facebook::react