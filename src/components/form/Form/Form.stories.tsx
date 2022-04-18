import { ComponentStory, ComponentMeta } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { within } from '@storybook/testing-library'
import { expect } from '@storybook/jest'

import Form from './Form'

import InputField from '@components/form/InputField'
// import { DefaultInputField } from '@components/form/InputField/InputField.stories'
import InputError from '@components/form/InputError'
import { DefaultInputError } from '@components/form/InputError/InputError.stories'
import InputLabel from '@components/form/InputLabel'
import { DefaultInputLabel } from '@components/form/InputLabel/InputLabel.stories'
import { InvalidInputLabel } from '@components/form/InputLabel/UseCases.stories'
import Button from '@components/generic/Button'
import { DefaultButton } from '@components/generic/Button/Button.stories'

import { storiesConfig } from '.'

export default {
  ...storiesConfig,
  subcomponents: {
    InputField,
    InputError,
    InputLabel,
    Button,
  }
} as ComponentMeta<typeof Form>

const Template: ComponentStory<typeof Form> = (args) => (
  <Form
    onSubmit={action('Form onSubmit')}
    {...args}
  >
  </Form>
)

export const DefaultForm = Template.bind({})
DefaultForm.storyName = 'Demo'
DefaultForm.args = {
  title: 'Form title!',
  description: 'This is a description field.',
  successMessage: 'This is a success message.',
  errorMessage: 'This is an error message.',
  children: (
    <>
      <InvalidInputLabel {...InvalidInputLabel.args} isRequired />
      <DefaultInputLabel {...DefaultInputLabel.args} />
      <DefaultInputLabel {...DefaultInputLabel.args} />
    </>
  ),
  control: (
    <>
      <DefaultButton {...DefaultButton.args} type="submit" wide>Submit</DefaultButton>
      <DefaultButton {...DefaultButton.args} wide>Discard</DefaultButton>
    </>
  ),
}
DefaultForm.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement)
  const component = canvas.queryByTestId('Form')
  await expect(component).toBeInTheDocument()
  await expect(component).toHaveTextContent(args.title)
  await expect(component).toHaveTextContent(args.description)
  await expect(component).toHaveTextContent(args.successMessage)
  await expect(component).toHaveTextContent(args.errorMessage)
  await expect(component).toHaveTextContent(InvalidInputLabel.args.title)
  // const input = canvas.getAllByDisplayValue(DefaultInputField.args.defaultValue)
  // await expect(input[0].value).toHaveTextContent(DefaultInputField.args.defaultValue)
  await expect(component).toHaveTextContent(DefaultInputError.args.children)
  await expect(component).toHaveTextContent('Submit')
  await expect(component).toHaveTextContent('Discard')
}
