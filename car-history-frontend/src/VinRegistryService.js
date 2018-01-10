
export default class VinRegistryService {

  setEntry(vin, contractAddress) {
    const registry = this.getAllEntries();
    registry[vin] = contractAddress;
    localStorage.setItem("VINRegistry", JSON.stringify(registry));
  }

  getAllEntries() {
    return JSON.parse(localStorage.getItem("VINRegistry")) || {};
  }
}
