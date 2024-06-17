/**
* This code was generated by [react-native-codegen](https://www.npmjs.com/package/react-native-codegen).
*
* Do not edit this file as changes may cause incorrect behavior and will be lost
* once the code is regenerated.
*
* @generated by codegen project: GeneratePropsJavaDelegate.js
*/

package com.facebook.react.viewmanagers;

import android.view.View;
import androidx.annotation.Nullable;
import com.facebook.react.bridge.DynamicFromObject;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.uimanager.BaseViewManagerDelegate;
import com.facebook.react.uimanager.BaseViewManagerInterface;

public class RNSVGMarkerManagerDelegate<T extends View, U extends BaseViewManagerInterface<T> & RNSVGMarkerManagerInterface<T>> extends BaseViewManagerDelegate<T, U> {
  public RNSVGMarkerManagerDelegate(U viewManager) {
    super(viewManager);
  }
  @Override
  public void setProperty(T view, String propName, @Nullable Object value) {
    switch (propName) {
      case "name":
        mViewManager.setName(view, value == null ? null : (String) value);
        break;
      case "opacity":
        mViewManager.setOpacity(view, value == null ? 1f : ((Double) value).floatValue());
        break;
      case "matrix":
        mViewManager.setMatrix(view, (ReadableArray) value);
        break;
      case "mask":
        mViewManager.setMask(view, value == null ? null : (String) value);
        break;
      case "markerStart":
        mViewManager.setMarkerStart(view, value == null ? null : (String) value);
        break;
      case "markerMid":
        mViewManager.setMarkerMid(view, value == null ? null : (String) value);
        break;
      case "markerEnd":
        mViewManager.setMarkerEnd(view, value == null ? null : (String) value);
        break;
      case "clipPath":
        mViewManager.setClipPath(view, value == null ? null : (String) value);
        break;
      case "clipRule":
        mViewManager.setClipRule(view, value == null ? 0 : ((Double) value).intValue());
        break;
      case "responsible":
        mViewManager.setResponsible(view, value == null ? false : (boolean) value);
        break;
      case "display":
        mViewManager.setDisplay(view, value == null ? null : (String) value);
        break;
      case "pointerEvents":
        mViewManager.setPointerEvents(view, value == null ? null : (String) value);
        break;
      case "fill":
        mViewManager.setFill(view, (ReadableMap) value);
        break;
      case "fillOpacity":
        mViewManager.setFillOpacity(view, value == null ? 1f : ((Double) value).floatValue());
        break;
      case "fillRule":
        mViewManager.setFillRule(view, value == null ? 1 : ((Double) value).intValue());
        break;
      case "stroke":
        mViewManager.setStroke(view, (ReadableMap) value);
        break;
      case "strokeOpacity":
        mViewManager.setStrokeOpacity(view, value == null ? 1f : ((Double) value).floatValue());
        break;
      case "strokeWidth":
        mViewManager.setStrokeWidth(view, new DynamicFromObject(value));
        break;
      case "strokeLinecap":
        mViewManager.setStrokeLinecap(view, value == null ? 0 : ((Double) value).intValue());
        break;
      case "strokeLinejoin":
        mViewManager.setStrokeLinejoin(view, value == null ? 0 : ((Double) value).intValue());
        break;
      case "strokeDasharray":
        mViewManager.setStrokeDasharray(view, new DynamicFromObject(value));
        break;
      case "strokeDashoffset":
        mViewManager.setStrokeDashoffset(view, value == null ? 0f : ((Double) value).floatValue());
        break;
      case "strokeMiterlimit":
        mViewManager.setStrokeMiterlimit(view, value == null ? 0f : ((Double) value).floatValue());
        break;
      case "vectorEffect":
        mViewManager.setVectorEffect(view, value == null ? 0 : ((Double) value).intValue());
        break;
      case "propList":
        mViewManager.setPropList(view, (ReadableArray) value);
        break;
      case "fontSize":
        mViewManager.setFontSize(view, new DynamicFromObject(value));
        break;
      case "fontWeight":
        mViewManager.setFontWeight(view, new DynamicFromObject(value));
        break;
      case "font":
        mViewManager.setFont(view, new DynamicFromObject(value));
        break;
      case "refX":
        mViewManager.setRefX(view, new DynamicFromObject(value));
        break;
      case "refY":
        mViewManager.setRefY(view, new DynamicFromObject(value));
        break;
      case "markerHeight":
        mViewManager.setMarkerHeight(view, new DynamicFromObject(value));
        break;
      case "markerWidth":
        mViewManager.setMarkerWidth(view, new DynamicFromObject(value));
        break;
      case "markerUnits":
        mViewManager.setMarkerUnits(view, value == null ? null : (String) value);
        break;
      case "orient":
        mViewManager.setOrient(view, value == null ? null : (String) value);
        break;
      case "minX":
        mViewManager.setMinX(view, value == null ? 0f : ((Double) value).floatValue());
        break;
      case "minY":
        mViewManager.setMinY(view, value == null ? 0f : ((Double) value).floatValue());
        break;
      case "vbWidth":
        mViewManager.setVbWidth(view, value == null ? 0f : ((Double) value).floatValue());
        break;
      case "vbHeight":
        mViewManager.setVbHeight(view, value == null ? 0f : ((Double) value).floatValue());
        break;
      case "align":
        mViewManager.setAlign(view, value == null ? null : (String) value);
        break;
      case "meetOrSlice":
        mViewManager.setMeetOrSlice(view, value == null ? 0 : ((Double) value).intValue());
        break;
      default:
        super.setProperty(view, propName, value);
    }
  }
}
