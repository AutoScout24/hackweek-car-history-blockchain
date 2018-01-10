
class VinRegistryService {

  setEntry(vin, contractAddress) {
    const registry = this.getAllEntries();
    registry[vin] = contractAddress;
    localStorage.setItem("VINRegistry", registry);
  }

  getAllEntries() {
    return localStorage.getItem("VINRegistry");
  }
}
