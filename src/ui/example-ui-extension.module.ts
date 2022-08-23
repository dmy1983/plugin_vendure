import { NgModule } from "@angular/core";
import { SharedModule, addNavMenuSection } from "@vendure/admin-ui/core";

@NgModule({
  imports: [SharedModule],
  providers: [
    addNavMenuSection(
      {
        id: "Precio_dolar_api",
        label: "Store_in_House",
        items: [
          {
            id: "dolar_api",
            label: "Dolar_api",
            routerLink: ["/extensions/examples"],
            icon: "star",
          },
        ],
      },
      "settings"
    ),
  ],
  exports: [],
})
export class ExampleUiExtensionModule {}
