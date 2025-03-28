import { useState, useEffect, useRef } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Loader2, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Tabs, TabsContent, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/hooks/use-toast"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { TabsList } from "@/components/ui/tabs"

const FIELDS_OF_INTEREST = [
  "Biology",
  "Business",
  "Chemistry",
  "Computer Science",
  "Ecology",
  "Economics",
  "Education",
  "Engineering",
  "Gender Studies",
  "History",
  "Mathematics",
  "Media Studies",
  "Neuroscience",
  "Physics",
  "Political Science",
  "Psychology",
  "Sociology",
]

const formSchema = z.object({
  // Personal Information
  email: z.string().email({ message: "Invalid email address" }),
  fullName: z.string().min(2, { message: "Full name is required" }),
  city: z.string().min(2, { message: "City is required" }),
  country: z.string().min(2, { message: "Country is required" }),
  phone: z.string().min(10, { message: "Valid phone number is required" }),

  // Academic Background
  ieltsScore: z.string().min(1, { message: "IELTS score is required" }),
  satScore: z.string().min(1, { message: "SAT score is required" }),
  schoolName: z.string().min(2, { message: "School name is required" }),
  grade: z.string().min(1, { message: "Grade is required" }),
  gpa: z.string().min(1, { message: "GPA is required" }),

  // Parent Information
  parentFullName: z
    .string()
    .min(2, { message: "Parent's full name is required" }),
  parentPhone: z
    .string()
    .min(10, { message: "Valid parent phone number is required" }),

  // Research & Extracurricular
  fieldsOfInterest: z
    .array(z.string())
    .min(1, { message: "Select at least one field of interest" })
    .max(3, { message: "You can select up to 3 fields of interest" }),
  researchInterest: z
    .string()
    .min(50, { message: "Research interest should be at least 50 characters" }),

  // Additional Information
  motivation: z.string().min(50, {
    message: "Motivation statement should be at least 50 characters",
  }),
  additionalInfo: z.string().optional(),
  financialAid: z.boolean().default(false),
})

export const ApplicationForm: React.FC = () => {
  const [activeTab, setActiveTab] = useState("personal")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [extracurriculars, setExtracurriculars] = useState<string[]>([])
  const [newActivity, setNewActivity] = useState("")

  const tabsRef = useRef<HTMLDivElement>(null)
  const tabLabels: Record<string, string> = {
    personal: "Personal",
    academic: "Academic",
    parent: "Parent",
    research: "Research",
    extracurricular: "Activities",
    additional: "Additional",
  }

  // Function to scroll to the active tab with left alignment
  const scrollToTab = (index: number) => {
    if (tabsRef.current) {
      const tabElements = tabsRef.current.querySelectorAll('[role="tab"]')
      if (tabElements[index]) {
        const tabElement = tabElements[index] as HTMLElement

        // For the first tab, always scroll all the way to the left
        if (index === 0) {
          tabsRef.current.scrollLeft = 0
          return
        }

        // For other tabs, position them with some space from the left edge
        const scrollLeft = Math.max(0, tabElement.offsetLeft - 20)
        tabsRef.current.scrollLeft = scrollLeft
      }
    }
  }

  // Auto-scroll to active tab when it changes
  useEffect(() => {
    const tabIndex = [
      "personal",
      "academic",
      "parent",
      "research",
      "extracurricular",
      "additional",
    ].indexOf(activeTab)
    if (tabIndex !== -1) {
      setTimeout(() => scrollToTab(tabIndex), 100)
    }
  }, [activeTab])

  // Ensure the first tab is visible on initial load
  useEffect(() => {
    if (tabsRef.current) {
      tabsRef.current.scrollLeft = 0
    }
  }, [])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      fullName: "",
      city: "",
      country: "",
      phone: "",
      ieltsScore: "",
      satScore: "",
      schoolName: "",
      grade: "",
      gpa: "",
      parentFullName: "",
      parentPhone: "",
      fieldsOfInterest: [],
      researchInterest: "",
      motivation: "",
      additionalInfo: "",
      financialAid: false,
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)

    // Include extracurriculars with the form data
    const formData = {
      ...values,
      extracurriculars,
    }

    // Simulate API call
    setTimeout(() => {
      console.log(formData)
      setIsSubmitting(false)
      toast({
        title: "Application Submitted",
        description:
          "Your research program application has been submitted successfully.",
      })
    }, 1500)
  }

  const addExtracurricular = () => {
    if (newActivity.trim() && extracurriculars.length < 5) {
      setExtracurriculars([...extracurriculars, newActivity.trim()])
      setNewActivity("")
    }
  }

  const removeExtracurricular = (index: number) => {
    setExtracurriculars(extracurriculars.filter((_, i) => i !== index))
  }

  const nextTab = (tab: string) => {
    if (tab === "personal") {
      const personalFields = ["email", "fullName", "city", "country", "phone"]
      const isValid = personalFields.every(
        (field) =>
          !form.formState.errors[field as keyof z.infer<typeof formSchema>]
      )

      if (isValid) {
        setActiveTab("academic")
      }
    } else if (tab === "academic") {
      const academicFields = [
        "ieltsScore",
        "satScore",
        "schoolName",
        "grade",
        "gpa",
      ]
      const isValid = academicFields.every(
        (field) =>
          !form.formState.errors[field as keyof z.infer<typeof formSchema>]
      )

      if (isValid) {
        setActiveTab("parent")
      }
    } else if (tab === "parent") {
      const parentFields = ["parentFullName", "parentPhone"]
      const isValid = parentFields.every(
        (field) =>
          !form.formState.errors[field as keyof z.infer<typeof formSchema>]
      )

      if (isValid) {
        setActiveTab("research")
      }
    } else if (tab === "research") {
      const researchFields = ["fieldsOfInterest", "researchInterest"]
      const isValid = researchFields.every(
        (field) =>
          !form.formState.errors[field as keyof z.infer<typeof formSchema>]
      )

      if (isValid) {
        setActiveTab("extracurricular")
      }
    } else if (tab === "extracurricular") {
      setActiveTab("additional")
    }
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardContent className="pt-6 px-3 sm:px-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <div className="relative mb-8">
            <TabsList
              ref={tabsRef}
              className="bg-white flex w-full overflow-x-auto snap-x scrollbar-none py-1 justify-start"
              style={{ scrollBehavior: "smooth" }}
            >
              {[
                "personal",
                "academic",
                "parent",
                "research",
                "extracurricular",
                "additional",
              ].map((tab, index) => (
                <TabsTrigger
                  key={tab}
                  value={tab}
                  className={`min-w-[90px] text-xs sm:text-sm whitespace-nowrap px-2 sm:px-4 py-1.5 sm:py-2 snap-start ${
                    activeTab === tab ? "active-tab" : ""
                  }`}
                  onClick={() => scrollToTab(index)}
                >
                  {tabLabels[tab]}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <TabsContent value="personal" className="space-y-6">
                <div className="space-y-2">
                  <h2 className="text-2xl font-semibold">
                    Personal Information
                  </h2>
                  <p className="text-muted-foreground">
                    Please provide your contact details.
                  </p>
                </div>

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="your.email@example.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City</FormLabel>
                        <FormControl>
                          <Input placeholder="New York" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="country"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Country</FormLabel>
                        <FormControl>
                          <Input placeholder="United States" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="+1 (555) 123-4567" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex flex-col sm:flex-row gap-2 justify-between">
                  <Button
                    type="button"
                    className="w-full sm:w-auto"
                    onClick={() => {
                      form.trigger([
                        "email",
                        "fullName",
                        "city",
                        "country",
                        "phone",
                      ])
                      nextTab("personal")
                    }}
                  >
                    Next: Academic Background
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="academic" className="space-y-6">
                <div className="space-y-2">
                  <h2 className="text-2xl font-semibold">
                    Academic Background
                  </h2>
                  <p className="text-muted-foreground">
                    Please provide details about your education and test scores.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <FormField
                    control={form.control}
                    name="ieltsScore"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>IELTS Score</FormLabel>
                        <FormControl>
                          <Input placeholder="7.5" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="satScore"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>SAT Score</FormLabel>
                        <FormControl>
                          <Input placeholder="1450" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="schoolName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>School Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Central High School" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <FormField
                    control={form.control}
                    name="grade"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Grade</FormLabel>
                        <FormControl>
                          <Input placeholder="12" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="gpa"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>GPA</FormLabel>
                        <FormControl>
                          <Input placeholder="3.8/4.0" {...field} />
                        </FormControl>
                        <FormDescription>
                          Please include the scale (e.g., 3.8/4.0)
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-2 justify-between">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full sm:w-auto"
                    onClick={() => setActiveTab("personal")}
                  >
                    Previous: Personal Information
                  </Button>
                  <Button
                    type="button"
                    className="w-full sm:w-auto"
                    onClick={() => {
                      form.trigger([
                        "ieltsScore",
                        "satScore",
                        "schoolName",
                        "grade",
                        "gpa",
                      ])
                      nextTab("academic")
                    }}
                  >
                    Next: Parent Information
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="parent" className="space-y-6">
                <div className="space-y-2">
                  <h2 className="text-2xl font-semibold">Parent Information</h2>
                  <p className="text-muted-foreground">
                    Please provide your parent or guardian's contact
                    information.
                  </p>
                </div>

                <FormField
                  control={form.control}
                  name="parentFullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Parent/Guardian Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Jane Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="parentPhone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Parent/Guardian Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="+1 (555) 987-6543" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex flex-col sm:flex-row gap-2 justify-between">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full sm:w-auto"
                    onClick={() => setActiveTab("academic")}
                  >
                    Previous: Academic Background
                  </Button>
                  <Button
                    type="button"
                    className="w-full sm:w-auto"
                    onClick={() => {
                      form.trigger(["parentFullName", "parentPhone"])
                      nextTab("parent")
                    }}
                  >
                    Next: Research Interests
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="research" className="space-y-6">
                <div className="space-y-2">
                  <h2 className="text-2xl font-semibold">Research Interests</h2>
                  <p className="text-muted-foreground">
                    Please select up to 3 fields of interest and describe your
                    research interests.
                  </p>
                </div>

                <FormField
                  control={form.control}
                  name="fieldsOfInterest"
                  render={() => (
                    <FormItem>
                      <div className="mb-4">
                        <FormLabel className="text-base">
                          Fields of Interest (Choose up to 3)
                        </FormLabel>
                        <FormDescription>
                          Select up to three fields that you are most interested
                          in researching.
                        </FormDescription>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                        {FIELDS_OF_INTEREST.map((field) => (
                          <FormField
                            key={field}
                            control={form.control}
                            name="fieldsOfInterest"
                            render={({ field: { onChange, value } }) => {
                              return (
                                <FormItem
                                  key={field}
                                  className="flex flex-row items-start space-x-3 space-y-0"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={value?.includes(field)}
                                      onCheckedChange={(checked) => {
                                        const currentValues = [...(value || [])]
                                        if (
                                          checked &&
                                          currentValues.length < 3
                                        ) {
                                          onChange([...currentValues, field])
                                        } else if (
                                          checked &&
                                          currentValues.length >= 3
                                        ) {
                                          toast({
                                            title: "Maximum Selection Reached",
                                            description:
                                              "You can only select up to 3 fields of interest.",
                                          })
                                        } else {
                                          onChange(
                                            currentValues.filter(
                                              (value) => value !== field
                                            )
                                          )
                                        }
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    {field}
                                  </FormLabel>
                                </FormItem>
                              )
                            }}
                          />
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="researchInterest"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Research Interest</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe your research interests and any specific topics you would like to explore..."
                          className="min-h-[150px]"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Explain why you are interested in these fields and what
                        specific questions or problems you hope to address.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex flex-col sm:flex-row gap-2 justify-between">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full sm:w-auto"
                    onClick={() => setActiveTab("parent")}
                  >
                    Previous: Parent Information
                  </Button>
                  <Button
                    type="button"
                    className="w-full sm:w-auto"
                    onClick={() => {
                      form.trigger(["fieldsOfInterest", "researchInterest"])
                      nextTab("research")
                    }}
                  >
                    Next: Extracurricular Activities
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="extracurricular" className="space-y-6">
                <div className="space-y-2">
                  <h2 className="text-2xl font-semibold">
                    Extracurricular Activities
                  </h2>
                  <p className="text-muted-foreground">
                    Please list up to 5 extracurricular activities you
                    participate in.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex flex-col space-y-2">
                    <Label htmlFor="new-activity">Add Activity</Label>
                    <div className="flex flex-col flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                      <Input
                        id="new-activity"
                        value={newActivity}
                        onChange={(e) => setNewActivity(e.target.value)}
                        onKeyDown={(event) => {
                          if (event.key === "Enter") {
                            addExtracurricular()
                          }
                        }}
                        placeholder="e.g., Debate Club, Volunteer Work, Sports Team"
                        disabled={extracurriculars.length >= 5}
                        className="flex-grow"
                      />
                    </div>
                    {extracurriculars.length >= 5 && (
                      <p className="text-sm text-muted-foreground">
                        You have reached the maximum of 5 activities.
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label>Your Activities</Label>
                    {extracurriculars.length === 0 ? (
                      <p className="text-sm text-muted-foreground py-2">
                        No activities added yet. Add up to 5 activities above.
                      </p>
                    ) : (
                      <div className="space-y-2">
                        {extracurriculars.map((activity, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-3 border rounded-md"
                          >
                            <span>{activity}</span>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeExtracurricular(index)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-2 justify-between">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full sm:w-auto"
                    onClick={() => setActiveTab("research")}
                  >
                    Previous: Research Interests
                  </Button>
                  <Button
                    type="button"
                    className="w-full sm:w-auto"
                    onClick={() => nextTab("extracurricular")}
                  >
                    Next: Additional Information
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="additional" className="space-y-6">
                <div className="space-y-2">
                  <h2 className="text-2xl font-semibold">
                    Additional Information
                  </h2>
                  <p className="text-muted-foreground">
                    Please provide any additional information to support your
                    application.
                  </p>
                </div>

                <FormField
                  control={form.control}
                  name="motivation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Motivation Statement</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Explain your motivation for applying to this research program..."
                          className="min-h-[150px]"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Describe why you want to participate in this program and
                        what you hope to achieve.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="additionalInfo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Additional Information (Optional)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Any other information you would like to share..."
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Include any additional information that may be relevant
                        to your application.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="financialAid"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Financial Aid</FormLabel>
                      <FormControl>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            id="financial-aid"
                          />
                          <label
                            htmlFor="financial-aid"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            I am applying for financial aid
                          </label>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {form.watch("financialAid") && (
                  <Alert>
                    <AlertDescription>
                      You have selected that you are applying for financial aid.
                      Additional documents and an interview will be required as
                      part of the financial aid application process.
                    </AlertDescription>
                  </Alert>
                )}

                <div className="flex flex-col sm:flex-row gap-2 justify-between">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full sm:w-auto"
                    onClick={() => setActiveTab("extracurricular")}
                  >
                    Previous: Extracurricular Activities
                  </Button>
                  <Button
                    type="submit"
                    className="w-full sm:w-auto"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      "Submit Application"
                    )}
                  </Button>
                </div>
              </TabsContent>
            </form>
          </Form>
        </Tabs>
      </CardContent>
    </Card>
  )
}
