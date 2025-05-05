import { CampaignDetail } from "./campaign-detail";
import { CampaignDetailTemplate as template } from "./campaign-detail.template";
import { CampaignDetailStyles as styles } from "./campaign-detail.styles";
import { CUSTOM_ELEMENT_PREFIX } from "@services/system";

CampaignDetail.define({
  name: `${CUSTOM_ELEMENT_PREFIX}-campaign-detail`,
  template,
  styles,
});
