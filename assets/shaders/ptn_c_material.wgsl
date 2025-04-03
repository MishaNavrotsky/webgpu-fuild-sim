struct VertexOut {
  @builtin(position) position: vec4f,
  @location(0) texCoords: vec2f,
  @location(1) normals: vec3f,
  @location(2) worldPosition: vec3f,
}

struct Camera {
  projection: mat4x4<f32>,
  view: mat4x4<f32>,
  model: mat4x4<f32>,
}

struct PointLight {
  worldPosition: vec4f,
  color: vec4f,
  intensityRadiusZZ: vec4f,
}

@group(0) @binding(0) var<uniform> camera: Camera;
@group(0) @binding(1) var<storage> pointLights: array<PointLight>;

@group(1) @binding(0) var colorTexture : texture_2d<f32>;

@group(2) @binding(0) var colorSampler : sampler;

@vertex
fn vertex_main(@location(0) position: vec4f, @location(1) texCoords: vec2f, @location(2) normals: vec3f) -> VertexOut {
  var out: VertexOut;
  out.position = camera.projection * camera.view * camera.model * position;
  out.texCoords = texCoords;
  out.normals = normals;

  var vertexWorldPosition = camera.model * position;
  out.worldPosition = vertexWorldPosition.xyz;
  return out;
}

@fragment
fn fragment_main(in: VertexOut) -> @location(0) vec4f {
  var color = textureSample(colorTexture, colorSampler, in.texCoords.xy);

  for(var i: u32 = 0; i < arrayLength(&pointLights); i++) {
    let lightDist = dot(in.normals.xyz, -normalize(in.worldPosition - pointLights[i].worldPosition.xyz)) * pointLights[i].intensityRadiusZZ.x;

    color *= lightDist;
  }
  // return vec4(1,0,0,1);


  return color;
}