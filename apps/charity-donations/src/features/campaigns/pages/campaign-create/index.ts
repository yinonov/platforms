import { CampaignCreate } from "./campaign-create";
import { CampaignCreateTemplate as template } from "./campaign-create.template";
import { CampaignCreateStyles as styles } from "./campaign-create.styles";
import { CUSTOM_ELEMENT_PREFIX } from "@services/system";

CampaignCreate.define({
  name: `${CUSTOM_ELEMENT_PREFIX}-campaign-create`,
  template,
  styles,
});
