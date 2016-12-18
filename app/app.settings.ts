import { OpaqueToken, FactoryProvider, ValueProvider } from "@angular/core";
import { DatePipe } from "@angular/common";

export const BackendUri: OpaqueToken = new OpaqueToken("BackendUri");

export const BackendUriProvider: ValueProvider = {
    provide: BackendUri,
    useValue: "http://localhost:5000"
};

