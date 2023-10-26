from js import document
from pyodide import create_proxy

class InputLog:
    def __init__(self, element_id):
        self.element_id = element_id
        self._element = None

    def element(self):
        """Return the DOM element"""
        if not self._element:
            self._element = document.querySelector(f"#{self.element_id}")
        return self._element

    def on_click(self, event):
        text = event.target.id
        output_element = document.getElementById("result")
        if text:
            if (text == "Enter"):
                if (output_element.textContent[-2] + output_element.textContent[-1]) == "/0":
                    output_element.textContent = "INVALID"
                text = eval(output_element.textContent)
                output_element.textContent = text
            if (text == "Backspace"):
                output_element.textContent = output_element.textContent[:-1]
            elif text.isdigit() or text in ["+", "-", "*", "/"]:
                if (output_element.textContent == "0"):
                    output_element.textContent = output_element.textContent[:-1]
                output_element.textContent += text

    def on_event(self, event):
        text = str(event.key)
        output_element = document.getElementById("result")
        if text:
            if (text == "Enter"):
                if (output_element.textContent[-2] + output_element.textContent[-1]) == "/0":
                    output_element.textContent = "INVALID"
                text = eval(output_element.textContent)
                output_element.textContent = text
            if (text == "Backspace"):
                output_element.textContent = output_element.textContent[:-1]
            elif text.isdigit() or text in ["+", "-", "*", "/"]:
                if (output_element.textContent == "0"):
                    output_element.textContent = output_element.textContent[:-1]
                output_element.textContent += text

output = InputLog("result")

click_proxy = create_proxy(output.on_click)
event_proxy = create_proxy(output.on_event)

document.addEventListener("click", click_proxy)
document.addEventListener("keydown", event_proxy)
