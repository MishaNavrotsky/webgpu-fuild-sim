import { mat4 } from "gl-matrix";


export default class ProjectionMatrix {
  private _fov: number = 90;
  private _aspect: number = 16 / 9;
  private _near: number = 0.001;
  private _far: number = Infinity;

  private _left: number = -100;
  private _right: number = 100;
  private _top: number = -100;
  private _bottom: number = 100;


  get projectionMatrix() {
    return mat4.perspectiveZO(mat4.create(), this._fov, this._aspect, this._near, this._far);
  }

  get projectionMatrixOrtho() {
    return mat4.orthoZO(mat4.create(), this._left, this._right, this._bottom, this._top, this._near, this._far);
  }

  get fov() {
    return this._fov;
  }
  set fov(v: number) {
    this._fov = v;
  }

  get aspect() {
    return this._aspect;
  }
  set aspect(v: number) {
    this._aspect = v;
  }

  get near() {
    return this._near;
  }
  set near(v: number) {
    this._near = v;
  }

  get far() {
    return this._far;
  }
  set far(v: number) {
    this._far = v;
  }

  set left(n: number) {
    this._left = n;
  }
  get left() {
    return this._left;
  }
  set right(n: number) {
    this._right = n;
  }
  get right() {
    return this._right;
  }
  set bottom(n: number) {
    this._bottom = n;
  }
  get bottom() {
    return this._bottom;
  }
  set top(n: number) {
    this._top = n;
  }
  get top() {
    return this._top;
  }
}