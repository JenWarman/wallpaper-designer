export interface NewUser {
    username: string;
    email: string;
    password: string;
}

export type FormState ={ message?: string}

export type OrderFormState ={ message?: string, quantity: number, price: number}

export type FormDataType = {
    theme: string, motif: string, scale: string, "background-colour": string, repeat: string
}

export type DropDownProps = {
    label: string;
    onChange: (option: React.ChangeEvent<HTMLSelectElement>) => void;
    options: string[];
    value: string;
    ariaLabel: string;
    disabled?: boolean;
}

export type CtaProps = {
  label: string;
  ctaFunction?: () => void;
  dataTestId: string;
  disabled?: boolean;
  ariaLabel: string;
  type: 'submit' | 'reset' | 'button' | undefined
};

 export type FormProps = {
  action: React.FormHTMLAttributes<HTMLFormElement>["action"];
  children: React.ReactNode;
  ctaLabel: string;
  dataTestId: string;
  ctaAriaLabel: string;
  ctaDisabled?: boolean;
};

export type InputProps = {
  id: string;
  label: string;
  type: string;
  placeholder?: string;
  ariaLabel: string;
  name: string;
  onChange?: (value: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (value: React.ChangeEvent<HTMLInputElement>) => void;
  dataTestId: string;
};

 export type BurgerMenuProps = {
    isOpen: boolean
}

 export type DesignData = {
  theme: string;
  motif: string;
  scale: string;
  colour: string;
  repeat: string
}

export type SavedDesign = {
  design_url: string;
  design_data: DesignData
}

export type PatternDesignProps = {
  design: DesignData;
};