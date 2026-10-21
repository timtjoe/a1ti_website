// error.js
const REGISTRY = require('./errorRegistry.json');

class Problem extends Error {
  static TYPE = REGISTRY;

  constructor(registryPayload, extensions = {}) {
    super(extensions.detail || registryPayload.detail);
    this.status = registryPayload.status;
    this.type = registryPayload.type;
    this.title = registryPayload.title;
    this.detail = extensions.detail || registryPayload.detail;
    this.instance = extensions.instance || null;
    this.errors = extensions.errors || null;
    this.meta = extensions.meta || null;
  }
}

module.exports = {
  Problem,
  error: Problem,
  TYPE: REGISTRY,
};
