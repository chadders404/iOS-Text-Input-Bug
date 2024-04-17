# Minimum reproducable example of iOS Text Input bug

Text input logs multiple keypresses on iOS when there is no user input.

I am really struggling to narrow down a consistent cause, but it seems to happen in these scenarios:

multiline={true}

and/ or

maxLength={EQUAL_TO_VALUE}

The bug can be triggered by autocorrecting/ autocompleting and can therefore be reduced by adding the following props:

autoCorrect={false}
autoComplete="off"

iOS 17.4
