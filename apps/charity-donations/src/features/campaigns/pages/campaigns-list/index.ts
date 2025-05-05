import { CampaignsList } from "./campaigns-list";
import { CampaignsListTemplate as template } from "./campaigns-list.template";
import { CampaignsListStyles as styles } from "./campaigns-list.styles";
import { CUSTOM_ELEMENT_PREFIX } from "@services/system";

CampaignsList.define({
  name: `${CUSTOM_ELEMENT_PREFIX}-campaigns-list`,
  template,
  styles,
});
