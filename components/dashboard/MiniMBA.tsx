import { GraduationCap, Play, BookOpen, Award } from "lucide-react";
import { Progress } from "../ui/progress";

interface MiniMBAProps {
  expanded?: boolean;
}

export function MiniMBA({ expanded = false }: MiniMBAProps) {
  const courses = [
    { title: "Financial Management", progress: 85, status: "In Progress" },
    { title: "Marketing Basics", progress: 100, status: "Completed" },
    { title: "Digital Sales", progress: 45, status: "In Progress" },
    { title: "Customer Relations", progress: 0, status: "Not Started" },
  ];

  return (
    <div className={`glass-card rounded-2xl p-6 ${expanded ? 'h-auto' : 'h-full'}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Mini MBA</h3>
        <span className="text-sm text-gray-600">व्यापार सीखें</span>
      </div>
      
      {/* Overall Progress */}
      <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl mb-4">
        <div className="flex items-center gap-3 mb-3">
          <GraduationCap className="w-6 h-6 text-purple-500" />
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-800">Overall Progress</p>
            <p className="text-xs text-gray-600">समग्र प्रगति</p>
          </div>
          <span className="text-lg font-bold text-purple-600">58%</span>
        </div>
        <Progress value={58} className="h-2 bg-purple-100" />
      </div>

      {expanded ? (
        <div className="space-y-4">
          <h4 className="font-semibold text-gray-800">Course Progress</h4>
          {courses.map((course, index) => (
            <div key={index} className="p-4 bg-white/50 rounded-xl border border-white/30">
              <div className="flex items-center justify-between mb-2">
                <h5 className="font-medium text-gray-800">{course.title}</h5>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  course.status === 'Completed' ? 'bg-green-100 text-green-600' :
                  course.status === 'In Progress' ? 'bg-blue-100 text-blue-600' :
                  'bg-gray-100 text-gray-600'
                }`}>
                  {course.status}
                </span>
              </div>
              <Progress value={course.progress} className="h-2 mb-3" />
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{course.progress}% Complete</span>
                <button className="flex items-center gap-1 text-blue-600 text-sm hover:text-blue-700">
                  {course.progress > 0 ? <Play className="w-4 h-4" /> : <BookOpen className="w-4 h-4" />}
                  {course.progress > 0 ? 'Continue' : 'Start'}
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          <div className="p-3 bg-white/50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-gray-800">Current: Financial Management</p>
              <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">85%</span>
            </div>
            <Progress value={85} className="h-2" />
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Award className="w-4 h-4 text-yellow-500" />
            <span>2 courses completed / 2 कोर्स पूर्ण</span>
          </div>

          <button className="w-full py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all flex items-center justify-center gap-2">
            <Play className="w-4 h-4" />
            Resume Learning / पढ़ाई जारी रखें
          </button>
        </div>
      )}
    </div>
  );
}