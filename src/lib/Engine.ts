import UI from "@/ui";
import Controls from "./Controls";
import Loader from "./Loader";
import Renderer from "./Renderer";

export type EngineConstructor = {
  renderer: Renderer, loader: Loader, controls: Controls, ui?: UI
}

export default class Engine {
  private _renderer: Renderer;
  private _loader: Loader;
  private _controls: Controls;
  private _ui: UI | undefined;
  constructor(settings: EngineConstructor) {
    this._renderer = settings.renderer;
    this._loader = settings.loader;
    this._controls = settings.controls;
  }

  async start() {
    this._controls.subscribe();
    await this._loader.loadShader('shader', '/assets/shaders/main.wgsl');
    await this._loader.loadShader('defaultMaterial', '/assets/shaders/defaultMaterial.wgsl');
    await this._loader.loadGLB('tyan', '/assets/models/alicev2rigged.glb');
    await this._renderer.initWebGpuCanvasContext();

    const repeat = () => requestAnimationFrame(async () => { await this.mainLoop(); repeat() })
    repeat();
  }

  setUI(ui: UI) {
    this._ui = ui;
    ui.init();
  }


  private startFrameTime = 0;
  private endFrameTime = 0;
  private dT = 0;
  private _gpuPipelineTimings = { cpu: 0, gpu: 0 }

  private async mainLoop() {
    this.startFrameTime = performance.now();

    await this._renderer.render(this.dT);
    this._gpuPipelineTimings = this._renderer.getTimings()

    this.endFrameTime = performance.now();

    this.dT = this.endFrameTime - this.startFrameTime;

    this._ui?.refresh()
  }

  getPerformance() {
    return {
      ...this._gpuPipelineTimings,
      dT: this.dT
    }

  }
}