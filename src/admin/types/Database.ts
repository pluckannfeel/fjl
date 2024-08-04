export type Company = {
    id: string;
    name_en?: string;
    name_ja?: string;
    prefecture_en?: string;
    prefecture_ja?: string;
    municipality_town_en?: string;
    municipality_town_ja?: string;
    building_en?: string;
    building_ja?: string;
    postal_code?: string;
    phone?: string;
    email?: string;
    website?: string;
    rep_name_en?: string;
    rep_name_ja?: string;
    rep_name_ja_kana?: string;
    rep_position_en?: string;
    rep_position_ja?: string;
    rep_phone?: string;
    rep_email?: string;
    secondary_rep_name_en?: string;
    secondary_rep_name_ja?: string;
    secondary_rep_name_ja_kana?: string;
    secondary_rep_position_en?: string;
    secondary_rep_position_ja?: string;
    secondary_rep_phone?: string;
    secondary_rep_email?: string;
    address_ja_reading?: string;
    created_at: Date;
  }
  