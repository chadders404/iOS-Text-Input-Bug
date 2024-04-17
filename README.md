# Minimum reproducable example of iOS Text Input bug

Text input logs multiple keypresses on iOS when there is no user input.

I am struggling to narrow down a consistent cause, but it seems to happen in these scenarios:

multiline={true}

and/ or:

maxLength={VALUE_VARIABLE.length} <----- Bug does not occur when maxLength is a number or set by a different variable to the value variable.

The bug can be triggered by autocorrecting/ autocompleting and can therefore be reduced by adding the following props:

autoCorrect={false}
autoComplete="off"

iOS 17.4
Expo 50.0.14 (Managed Workflow)
React Native 0.73.6
