/**
* This code was generated by [react-native-codegen](https://www.npmjs.com/package/react-native-codegen).
*
* Do not edit this file as changes may cause incorrect behavior and will be lost
* once the code is regenerated.
*
* @generated by codegen project: GeneratePropsJavaInterface.js
*/

package com.facebook.react.viewmanagers;

import android.view.View;
import androidx.annotation.Nullable;
import com.facebook.react.bridge.Dynamic;
import com.facebook.react.bridge.ReadableArray;

public interface RNSVGRadialGradientManagerInterface<T extends View> {
  void setName(T view, @Nullable String value);
  void setOpacity(T view, float value);
  void setMatrix(T view, @Nullable ReadableArray value);
  void setMask(T view, @Nullable String value);
  void setMarkerStart(T view, @Nullable String value);
  void setMarkerMid(T view, @Nullable String value);
  void setMarkerEnd(T view, @Nullable String value);
  void setClipPath(T view, @Nullable String value);
  void setClipRule(T view, int value);
  void setResponsible(T view, boolean value);
  void setDisplay(T view, @Nullable String value);
  void setPointerEvents(T view, @Nullable String value);
  void setFx(T view, Dynamic value);
  void setFy(T view, Dynamic value);
  void setCx(T view, Dynamic value);
  void setCy(T view, Dynamic value);
  void setRx(T view, Dynamic value);
  void setRy(T view, Dynamic value);
  void setGradient(T view, @Nullable ReadableArray value);
  void setGradientUnits(T view, int value);
  void setGradientTransform(T view, @Nullable ReadableArray value);
}
