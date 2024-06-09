export interface Status {
  valid: boolean;
  message?: string;
}

// Mỗi rule là 1 function
type Rule = (value: string) => Status;

export function required(value: string): Status {
  const valid = Boolean(value);

  return {
    valid: valid,
    message: valid ? undefined : "This field is required",
  };
}

// function return a function => when invoke length => actually invoke returned function by length()
export function length({ min, max }: { min: number; max: number }): Rule {
    return function (value: string): Status {
        const result = Boolean(value.length >= min && value.length <= max);

        return {
            valid: result,
            message: result ? undefined : `This field mus be between ${min} and ${max}`
        }
    }
}

export function validate(value: string, rules: Rule[]): Status {
  for (const rule of rules) {
    console.log(rule(value), rule)
    const result = rule(value);
    if (!result.valid) {
      return result;
    }
  }

  return {
    valid: true,
  };
}

console.log(validate("", [required]), validate("username", [required]));
console.log(validate('a', [length({min: 5, max: 10})]))
